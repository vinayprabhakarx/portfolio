import { memo, useMemo, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";

/**
 * Reusable data pagination controller.
 * Handles the calculation of visible pages, ellipsis logic, and chunking of data arrays.
 * 
 * @param {Array} data - The complete dataset to be paginated.
 * @param {number} itemsPerPage - Number of items to display per page slice.
 * @param {number} currentPage - Currently active page index (1-indexed).
 * @param {Function} onPageChange - Callback invoked when a user selects a new page.
 * @param {Function} onDataChange - Callback invoked with the sliced data whenever pagination state changes.
 * @param {number} maxVisiblePages - Maximum number of pagination buttons to render before collapsing into ellipses.
 */
const Pagination = memo(
  ({
    data = [],
    itemsPerPage = 5,
    currentPage = 1,
    onPageChange,
    onDataChange,
    maxVisiblePages = 7,
  }) => {
    // Input validation
    const safeItemsPerPage = Math.max(1, itemsPerPage);
    const safeMaxVisiblePages = Math.max(5, maxVisiblePages); // Minimum 5 for proper ellipsis

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / safeItemsPerPage) || 1;
    const lastNotifiedRef = useRef({ page: 0, totalItems: 0, itemsPerPage: 0 });

    const safeCurrentPage = useMemo(
      () => Math.min(Math.max(currentPage, 1), totalPages),
      [currentPage, totalPages]
    );

    const paginatedData = useMemo(() => {
      const startIdx = (safeCurrentPage - 1) * safeItemsPerPage;
      return data.slice(startIdx, startIdx + safeItemsPerPage);
    }, [data, safeCurrentPage, safeItemsPerPage]);

    const pageInfo = useMemo(
      () => ({
        currentPage: safeCurrentPage,
        totalPages,
        itemsPerPage: safeItemsPerPage,
        totalItems,
      }),
      [safeCurrentPage, totalPages, safeItemsPerPage, totalItems]
    );

    useEffect(() => {
      // Broadcast the newly sliced data payload to the parent component
      // We skip emitting if the underlying pagination state hasn't meaningfully changed
      if (
        lastNotifiedRef.current.page !== safeCurrentPage ||
        lastNotifiedRef.current.totalItems !== totalItems ||
        lastNotifiedRef.current.itemsPerPage !== safeItemsPerPage
      ) {
        onDataChange?.(paginatedData, pageInfo);
        lastNotifiedRef.current = {
          page: safeCurrentPage,
          totalItems,
          itemsPerPage: safeItemsPerPage,
        };
      }
    }, [safeCurrentPage, totalItems, safeItemsPerPage, onDataChange, paginatedData, pageInfo]);

    const createEllipsis = useCallback((targetPage) => ({
      type: "ellipsis",
      targetPage: Math.min(Math.max(targetPage, 1), totalPages),
    }), [totalPages]);

    const pageNumbers = useMemo(() => {
      if (totalPages <= safeMaxVisiblePages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const pages = [];
      const sidePages = Math.floor((safeMaxVisiblePages - 3) / 2); // Reserve 3 for 1, ellipsis, totalPages

      if (safeCurrentPage <= sidePages + 2) {
        // Show: 1, 2, 3, 4, 5, ..., totalPages
        for (let i = 1; i <= safeMaxVisiblePages - 2; i++) {
          pages.push(i);
        }
        pages.push(createEllipsis(safeMaxVisiblePages - 1));
        pages.push(totalPages);
      } else if (safeCurrentPage >= totalPages - sidePages - 1) {
        // Show: 1, ..., n-4, n-3, n-2, n-1, n
        pages.push(1);
        const startPage = totalPages - (safeMaxVisiblePages - 3);
        pages.push(createEllipsis(startPage - 1));
        for (let i = startPage; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show: 1, ..., current-1, current, current+1, ..., totalPages
        pages.push(1);
        pages.push(createEllipsis(safeCurrentPage - sidePages - 1));

        const start = safeCurrentPage - sidePages;
        const end = safeCurrentPage + sidePages;
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }

        pages.push(createEllipsis(safeCurrentPage + sidePages + 1));
        pages.push(totalPages);
      }

      return pages;
    }, [safeCurrentPage, totalPages, safeMaxVisiblePages, createEllipsis]);

    const handlePageClick = useCallback(
      (page) => {
        if (!onPageChange) return;

        const targetPage =
          typeof page === "object" && page.type === "ellipsis"
            ? page.targetPage
            : page;

        if (typeof targetPage === "number" && targetPage !== safeCurrentPage) {
          onPageChange(targetPage);
        }
      },
      [onPageChange, safeCurrentPage]
    );

    const handlePrevious = useCallback(() => {
      if (safeCurrentPage > 1 && onPageChange) {
        onPageChange(safeCurrentPage - 1);
      }
    }, [safeCurrentPage, onPageChange]);

    const handleNext = useCallback(() => {
      if (safeCurrentPage < totalPages && onPageChange) {
        onPageChange(safeCurrentPage + 1);
      }
    }, [safeCurrentPage, totalPages, onPageChange]);

    const isFirstPage = safeCurrentPage <= 1;
    const isLastPage = safeCurrentPage >= totalPages;

    // Return the pagination UI only if the data spans multiple pages
    return (
      <>
        {/* You can render your data here, or return it via onDataChange */}
        {totalPages > 1 && (
          <PaginationContainer aria-label="Pagination">
            <ArrowButton
              onClick={handlePrevious}
              disabled={isFirstPage}
              aria-label="Previous Page"
              type="button"
            >
              &#8592;
            </ArrowButton>

            {pageNumbers.map((page, idx) => {
              const isEllipsis = typeof page === "object";
              const pageNumber = isEllipsis ? page.targetPage : page;
              const isActive = !isEllipsis && page === safeCurrentPage;

              return (
                <PaginationButton
                  key={isEllipsis ? `ellipsis-${idx}` : page}
                  $active={isActive}
                  $isEllipsis={isEllipsis}
                  onClick={() => handlePageClick(page)}
                  aria-label={
                    isEllipsis ? `Go to page ${pageNumber}` : `Page ${page}`
                  }
                  aria-current={isActive ? "page" : undefined}
                  type="button"
                >
                  {isEllipsis ? "..." : page}
                </PaginationButton>
              );
            })}

            <ArrowButton
              onClick={handleNext}
              disabled={isLastPage}
              aria-label="Next Page"
              type="button"
            >
              &#8594;
            </ArrowButton>
          </PaginationContainer>
        )}
      </>
    );
  }
);

Pagination.displayName = "Pagination";

// Styled components
const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing["3xl"]};
  flex-wrap: wrap;
`;

const PaginationButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.gradients.primary : theme.gradients.primaryTransparent};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.extrabold};
  transition: ${({ theme }) => theme.transitions.default};
  user-select: none;
  outline: none;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.white : theme.colors.secondary};
  }

  &:active:not(:disabled) {
    color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 0.125rem solid ${({ theme }) => theme.colors.primary};
    outline-offset: 0.125rem;
  }
`;

const ArrowButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.disabled : theme.colors.primary};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  transition: ${({ theme }) => theme.transitions.default};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  outline: none;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.secondary};
  }

  &:active:not(:disabled) {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 0.125rem solid ${({ theme }) => theme.colors.primary};
    outline-offset: 0.125rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  }
`;

export default Pagination;
