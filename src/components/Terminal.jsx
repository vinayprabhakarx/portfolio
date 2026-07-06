import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import profilePhoto from "../assets/photo.png";
import { CONFIG } from "../config/contactConfig";
import {
  CurrentInput,
  Cursor,
  ErrorText,
  FastFetch,
  FastFetchHeader,
  FastFetchInfo,
  FastFetchLogo,
  FastFetchSep,
  HiddenTerminalInput,
  InputLine,
  KeyText,
  Path,
  Prompt,
  StringText,
  TerminalBar,
  TerminalBody,
  TerminalHint,
  TerminalLine,
  TerminalLink,
  TerminalPre,
  TerminalShell,
  TerminalTitle,
  WhoamiPhoto,
  TerminalColumn,
} from "../styles/TerminalStyles";

const commandNames = [
  "help",
  "whoami",
  "skills",
  "projects",
  "education",
  "contact",
  "status",
  "welcome",
  "fastfetch",
  "neofetch",
  "clear",
  "ls",
  "pwd",
  "cd",
  "cat",
  "echo",
  "date",
  "history",
  "man",
  "mail",
  "message",
  "exit",
  "close",
  "sudo",
  "ping",
  "quote",
  "calc",
  "uptime",
  "repo",
  "theme",
  "download",
];

const pageNames = ["about", "projects", "skills", "education", "contact"];

const manPages = {
  whoami: "print current user info (Vinay Prabhakar)",
  skills: "list technical skills by category",
  projects: "list featured projects with live links",
  education: "show academic background",
  contact: "show email and social links",
  status: "show current availability as JSON",
  clear: "clear the terminal screen",
  ls: "list files in the current directory",
  pwd: "print working directory",
  cat: "display contents of a file - usage: cat <file>",
  echo: "print text back to the terminal - usage: echo <text>",
  date: "show the current date and time",
  history: "show previously run commands",
  man: "show manual for a command - usage: man <command>",
  welcome: "replay the boot-screen fastfetch welcome",
  mail: "compose a mailto message inside the terminal",
  exit: "attempt to close this browser tab",
  sudo: "execute a command as superuser",
  ping: "send ICMP ECHO_REQUEST to network hosts - usage: ping <host>",
  quote: "display a random programming quote",
  calc: "evaluate a mathematical expression - usage: calc <expression>",
  uptime: "tell how long the system has been running",
  repo: "open the github repository for this portfolio",
  theme: "toggle the application theme (dark/light)",
  download: "download a file - usage: download resume",
};

const logo = [
  "       :. +#--@+.=+         ",
  "    .. %%**+==-=+#%=**      ",
  "    =@*=.          -*%-=:   ",
  "  =+#=         +:    .#@:   ",
  " .-@:          :@=     +%*. ",
  ".*%=      -**:  *@:     %*. ",
  ".=%      :@%-#. #@:     =@+.",
  "-*%      .%#   +%-      -@- ",
  " =@:      :%*:**.       *#=.",
  ".=+#        *@-        :@*  ",
  "  =@#-:+**++-:-++**+:.=@-:. ",
  "  ..=@+:.-=+*.#+=-..-*#*:   ",
  "    :==#*=:.::..:-+*%%      ",
  "       =+:*@++@#=#%  .      ",
  "           :  -.            ",
].join("\n");

const PromptTag = ({ path }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginRight: '0.3rem' }}>
    <Prompt>vinay@portfolio</Prompt>
    <Path>{path}</Path>
    <Prompt>❯</Prompt>
  </span>
);

const FastFetchOutput = () => {
  const rows = [
    ["user", "vinay@portfolio"],
    ["host", "vinayprabhakar.dev"],
    ["stack", "React / Spring Boot / Node.js"],
    ["status", "open to work"],
    ["shell", "Terminal.jsx"],
  ];

  return (
    <FastFetch>
      <FastFetchLogo>{logo}</FastFetchLogo>
      <FastFetchInfo>
        <FastFetchHeader>vinay@portfolio</FastFetchHeader>
        <FastFetchSep>-----------------</FastFetchSep>
        {rows.map(([label, value]) => (
          <div key={label}>
            <KeyText>{label.padEnd(7, " ")}</KeyText>
            {value}
          </div>
        ))}
      </FastFetchInfo>
    </FastFetch>
  );
};

const HelpOutput = () => (
  <TerminalPre>
    Available commands:{"\n"}
    <KeyText>whoami</KeyText>     - who is Vinay{"\n"}
    <KeyText>skills</KeyText>     - tech stack{"\n"}
    <KeyText>projects</KeyText>   - what I&apos;ve built{"\n"}
    <KeyText>education</KeyText>  - academic background{"\n"}
    <KeyText>contact</KeyText>    - get in touch{"\n"}
    <KeyText>status</KeyText>     - current availability{"\n"}
    <KeyText>neofetch</KeyText>    - replay the boot screen{"\n"}
    <KeyText>mail</KeyText>       - compose a message{"\n"}
    <KeyText>clear</KeyText>      - clear the terminal{"\n"}
     <KeyText>sudo</KeyText>       - execute as superuser{"\n"}
    <KeyText>ping</KeyText>       - check network status{"\n"}
    <KeyText>quote</KeyText>      - random programming quote{"\n"}
    <KeyText>calc</KeyText>       - evaluate math expression{"\n"}
    <KeyText>uptime</KeyText>     - session duration{"\n"}
    <KeyText>repo</KeyText>       - open GitHub profile{"\n"}
    <KeyText>weather</KeyText>    - check current weather{"\n"}
    <KeyText>ls / pwd / cat / echo / date / history / man</KeyText>
    {"\n"}
  </TerminalPre>
);

const WhoamiOutput = () => (
  <>
    <WhoamiPhoto src={profilePhoto} alt="Vinay Kumar" />
    <TerminalPre>
      <StringText>Vinay Kumar</StringText>
      {"\n"}Full-stack developer focused on the MERN stack and Java/Spring Boot.
      {"\n"}Also explores machine learning with Python, scikit-learn, and Pandas.
      {"\n"}Goal: start my career as a web developer and keep growing through
      {"\n"}real-world projects.
    </TerminalPre>
  </>
);

const SkillsOutput = () => (
  <TerminalPre>
    <KeyText>languages</KeyText>:    <StringText>Python, Java, JavaScript</StringText>
    {"\n"}
    <KeyText>web</KeyText>:          <StringText>React.js, Node.js, Express.js, Spring Boot,</StringText>
    {"\n"}              <StringText>Tailwind CSS, Redux Toolkit, Vite, JWT</StringText>
    {"\n"}
    <KeyText>ml</KeyText>:           <StringText>NumPy, Pandas, Scikit-learn, TensorFlow, Keras</StringText>
    {"\n"}
    <KeyText>databases</KeyText>:    <StringText>MySQL, MongoDB, PostgreSQL, Redis</StringText>
    {"\n"}
    <KeyText>cloud/devops</KeyText>: <StringText>AWS, DigitalOcean, Docker, Nginx, Cloudflare</StringText>
    {"\n"}
    <KeyText>tools</KeyText>:        <StringText>Linux (daily driver), Git, Postman</StringText>
  </TerminalPre>
);

const ProjectsOutput = () => (
  <TerminalPre>
    <KeyText>Budget Setu</KeyText> - statement-first finance management app; auto-categorizes{"\n"}
    {"             "}and dedupes UPI/bank transactions from PDF/CSV imports{"\n"}
    {"             "}
    <TerminalLink href="https://fin.vinayprabhakar.dev" target="_blank" rel="noreferrer">
      fin.vinayprabhakar.dev
    </TerminalLink>
    {"\n\n"}
    <KeyText>/learn.ref</KeyText> - zero-dependency learning reference platform,{"\n"}
    {"             "}dynamically renders study material from JSON{"\n"}
    {"             "}
    <TerminalLink href="https://learn.vinayprabhakar.dev" target="_blank" rel="noreferrer">
      learn.vinayprabhakar.dev
    </TerminalLink>
    {"\n\n"}
    <KeyText>Blog App</KeyText> - full-stack blogging platform with auth, comments,{"\n"}
    {"             "}likes, and notifications{"\n"}
    {"             "}
    <TerminalLink href="https://blog.vinayprabhakar.dev" target="_blank" rel="noreferrer">
      blog.vinayprabhakar.dev
    </TerminalLink>
    {"\n\n"}
    <KeyText>Plant Disease Recognition</KeyText> - deep learning model trained on{"\n"}
    {"             "}~87k leaf images to spot plant disease{"\n"}
    {"             "}
    <TerminalLink href="https://vinayprabhakar-plant.streamlit.app/" target="_blank" rel="noreferrer">
      live demo
    </TerminalLink>
    {"\n\n"}Type <KeyText>contact</KeyText> for GitHub repos.
  </TerminalPre>
);

const EducationOutput = () => (
  <TerminalPre>
    <KeyText>BCA</KeyText>  Indian Institute of Business Mgmt, Patna  <StringText>2022-2025</StringText>
    {"\n"}
    <KeyText>ISc</KeyText>  S.K. College, Lohanda, Jamui              <StringText>2018-2020</StringText>
    {"\n"}
    <KeyText>10th</KeyText> Janta High School, Satyana, Jamui         <StringText>2017-2018</StringText>
  </TerminalPre>
);

const ContactOutput = () => (
  <TerminalPre>
    email:    <TerminalLink href="mailto:vinay@vinayprabhakar.dev">vinay@vinayprabhakar.dev</TerminalLink>
    {"\n"}github:   <TerminalLink href="https://github.com/vinayprabhakarx" target="_blank" rel="noreferrer">github.com/vinayprabhakarx</TerminalLink>
    {"\n"}linkedin: <TerminalLink href="https://www.linkedin.com/in/VinayPrabhakarX/" target="_blank" rel="noreferrer">linkedin.com/in/VinayPrabhakarX</TerminalLink>
    {"\n"}x:        <TerminalLink href="https://x.com/VinayPrabhakarX" target="_blank" rel="noreferrer">x.com/VinayPrabhakarX</TerminalLink>
  </TerminalPre>
);

const StatusOutput = () => (
  <TerminalPre>
    {"{"}
    {"\n  "}
    <KeyText>&quot;open_to_work&quot;</KeyText>: <KeyText>true</KeyText>,
    {"\n  "}
    <KeyText>&quot;response_time&quot;</KeyText>: <StringText>&quot;~fast&quot;</StringText>,
    {"\n  "}
    <KeyText>&quot;status&quot;</KeyText>: <StringText>&quot;200 OK&quot;</StringText>
    {"\n}"}
  </TerminalPre>
);

const commandOutputs = {
  help: <HelpOutput />,
  whoami: <WhoamiOutput />,
  skills: <SkillsOutput />,
  projects: <ProjectsOutput />,
  education: <EducationOutput />,
  contact: <ContactOutput />,
  status: <StatusOutput />,
};

const fileOutputs = {
  "about.json": <WhoamiOutput />,
  "skills.json": <SkillsOutput />,
  "projects.json": <ProjectsOutput />,
  "education.json": <EducationOutput />,
  "resume.pdf": (
    <>
      <ErrorText>cat: resume.pdf: binary file - </ErrorText>
      <TerminalLink href="/resume">open resume instead</TerminalLink>
    </>
  ),
};

const fileNames = Object.keys(fileOutputs);

const Terminal = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const bootedRef = useRef(false);
  const lineIdRef = useRef(0);
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState("~");
  const [mailFlow, setMailFlow] = useState(null);
  const [cursorPos, setCursorPos] = useState(0);

  const updateCursor = useCallback(() => {
    setCursorPos(inputRef.current?.selectionStart || 0);
  }, []);

  const prompt = useCallback((path = currentPath) => {
    if (mailFlow) {
      if (mailFlow.step === "name") return "Your name: ";
      if (mailFlow.step === "email") return "Your email: ";
      if (mailFlow.step === "message") return "Your message (Shift+Enter for new line):\n";
      return <Prompt>&gt;</Prompt>;
    }
    return <PromptTag path={path} />;
  }, [currentPath, mailFlow]);

  const printLine = useCallback((node) => {
    const id = lineIdRef.current;
    lineIdRef.current += 1;
    setLines((current) => [...current, { id, node }]);
  }, []);

  const printPromptLine = useCallback(
    (raw) => {
      printLine(
        <>
          {prompt()} {raw}
        </>
      );
    },
    [printLine, prompt]
  );

  const addToHistory = useCallback((value) => {
    if (!value.trim()) return;
    setHistory((current) => {
      const next = [...current, value.trim()];
      setHistoryIndex(next.length);
      return next;
    });
  }, []);

  const startMail = useCallback(() => {
    setMailFlow({ step: "name", data: {} });
    printLine(
      <>
        <KeyText>Compose a message</KeyText> - type <ErrorText>cancel</ErrorText> anytime to stop
      </>
    );
  }, [printLine]);

  const handleMailInput = useCallback(
    (value) => {
      const trimmed = value.trim();
      let promptText = "";
      if (mailFlow?.step === "name") promptText = "Your name: ";
      else if (mailFlow?.step === "email") promptText = "Your email: ";
      else if (mailFlow?.step === "message") promptText = "Your message (Shift+Enter for new line):\n";

      printLine(
        <>
          {promptText}{value}
        </>
      );

      if (trimmed.toLowerCase() === "cancel") {
        printLine(<ErrorText>Message cancelled.</ErrorText>);
        setMailFlow(null);
        return;
      }

      if (!mailFlow) return;

      if (mailFlow.step === "name") {
        if (!trimmed) {
          printLine(<ErrorText>Name cannot be empty.</ErrorText>);
          return;
        }
        if (trimmed.length < 2) {
          printLine(<ErrorText>Name must be at least 2 characters.</ErrorText>);
          return;
        }
        if (!/^[A-Za-z\s]+$/.test(trimmed)) {
          printLine(<ErrorText>Name can contain only letters and spaces.</ErrorText>);
          return;
        }
        setMailFlow({ step: "email", data: { ...mailFlow.data, name: trimmed } });
        return;
      }

      if (mailFlow.step === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
          printLine(<ErrorText>Please enter a valid email address.</ErrorText>);
          return;
        }
        setMailFlow({ step: "message", data: { ...mailFlow.data, email: trimmed } });
        return;
      }

      if (!trimmed) {
        printLine(<ErrorText>Message cannot be empty.</ErrorText>);
        return;
      }
      if (trimmed.length < 10) {
        printLine(<ErrorText>Message must be at least 10 characters.</ErrorText>);
        return;
      }

      const data = { ...mailFlow.data, message: trimmed };
      const subject = `Portfolio contact from ${data.name}`;

      printLine(
        <TerminalPre>
          {"{"}
          {"\n  "}
          <KeyText>&quot;name&quot;</KeyText>: <StringText>{`"${data.name}"`}</StringText>,
          {"\n  "}
          <KeyText>&quot;email&quot;</KeyText>: <StringText>{`"${data.email}"`}</StringText>,
          {"\n  "}
          <KeyText>&quot;message&quot;</KeyText>: <StringText>{`"${data.message}"`}</StringText>
          {"\n}"}
        </TerminalPre>
      );
      printLine(<KeyText>Sending message via secure channel...</KeyText>);
      
      setMailFlow(null);

      fetch(CONFIG.API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: data.name,
          email: data.email,
          subject: subject,
          message: data.message
        })
      })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json().catch(() => ({}));
      })
      .then(resData => {
        printLine(<StringText>{resData.message || "Message sent successfully! I'll get back to you soon."}</StringText>);
      })
      .catch(err => {
        printLine(<ErrorText>Failed to send message: {err.message}</ErrorText>);
      });
    },
    [printLine, mailFlow]
  );

  const runCommand = useCallback(
    (raw) => {
      const trimmed = raw.trim();
      const [word = "", ...rest] = trimmed.split(/\s+/);
      const cmd = word.toLowerCase();
      const arg = rest.join(" ");
      const nextHistory = trimmed ? [...history, trimmed] : history;

      printPromptLine(raw);
      addToHistory(raw);

      if (!cmd) return;

      if (cmd === "clear") {
        setLines([]);
        return;
      }

      if (cmd === "welcome" || cmd === "fastfetch" || cmd === "neofetch") {
        printLine(<FastFetchOutput />);
        return;
      }

      if (cmd === "pwd") {
        const suffix = currentPath === "~" ? "" : currentPath;
        printLine(<TerminalPre>{`/home/vinay/portfolio${suffix}`}</TerminalPre>);
        return;
      }

      if (cmd === "ls") {
        if (currentPath === "~") {
          printLine(
            <TerminalPre>
              {pageNames.map((page) => (
                <span key={page}>
                  <KeyText>{page}/</KeyText>{"  "}
                </span>
              ))}
              resume.pdf
            </TerminalPre>
          );
        } else {
          const dirName = currentPath.replace("/", "");
          printLine(<TerminalPre>{dirName}.json</TerminalPre>);
        }
        return;
      }

      if (cmd === "cd") {
        const target = (arg || "~").trim();
        if (["~", "/", "", "..", "../"].includes(target)) {
          setCurrentPath("~");
          printLine(<KeyText>-&gt; back to ~</KeyText>);
          return;
        }

        const clean = target.replace(/^\//, "").replace(/\/$/, "");
        if (pageNames.includes(clean)) {
          setCurrentPath(`/${clean}`);
          printLine(
            <>
              <KeyText>{`-> navigating to /${clean}`}</KeyText>
            </>
          );
          window.setTimeout(() => navigate(clean === "skills" || clean === "education" ? "/about" : `/${clean}`), 250);
          return;
        }

        printLine(
          <>
            <ErrorText>cd: {target}: No such directory</ErrorText> - try <KeyText>ls</KeyText>
          </>
        );
        return;
      }

      if (cmd === "cat") {
        if (!arg) {
          printLine(<ErrorText>usage: cat &lt;file&gt;</ErrorText>);
        } else if (fileOutputs[arg]) {
          printLine(fileOutputs[arg]);
        } else {
          printLine(
            <>
              <ErrorText>cat: {arg}: No such file</ErrorText> - try <KeyText>ls</KeyText>
            </>
          );
        }
        return;
      }

      if (cmd === "echo") {
        printLine(<TerminalPre>{arg}</TerminalPre>);
        return;
      }

      if (cmd === "date") {
        printLine(<TerminalPre>{new Date().toString()}</TerminalPre>);
        return;
      }

      if (cmd === "history") {
        if (nextHistory.length === 0) {
          printLine(<ErrorText>no commands yet</ErrorText>);
        } else {
          printLine(<TerminalPre>{nextHistory.map((item, index) => `${index + 1}  ${item}`).join("\n")}</TerminalPre>);
        }
        return;
      }

      if (cmd === "man") {
        if (!arg) {
          printLine(<ErrorText>usage: man &lt;command&gt;</ErrorText>);
        } else if (manPages[arg]) {
          printLine(<TerminalPre>{arg} - {manPages[arg]}</TerminalPre>);
        } else {
          printLine(<ErrorText>no manual entry for {arg}</ErrorText>);
        }
        return;
      }

      if (cmd === "sudo") {
        printLine(<ErrorText>vinay is not in the sudoers file. This incident will be reported.</ErrorText>);
        return;
      }

      if (cmd === "ping") {
        const targetHost = arg || "google.com";
        printLine(
          <TerminalPre>
            PING {targetHost} (142.250.190.46): 56 data bytes{"\n"}
            64 bytes from 142.250.190.46: icmp_seq=0 ttl=116 time=14.1 ms{"\n"}
            64 bytes from 142.250.190.46: icmp_seq=1 ttl=116 time=15.2 ms{"\n"}
            64 bytes from 142.250.190.46: icmp_seq=2 ttl=116 time=13.8 ms{"\n"}
            64 bytes from 142.250.190.46: icmp_seq=3 ttl=116 time=14.5 ms{"\n"}
            {"\n"}--- {targetHost} ping statistics ---{"\n"}
            4 packets transmitted, 4 packets received, 0.0% packet loss
          </TerminalPre>
        );
        return;
      }

      if (cmd === "quote") {
        const quotes = [
          "\"Talk is cheap. Show me the code.\" - Linus Torvalds",
          "\"Programs must be written for people to read, and only incidentally for machines to execute.\" - Harold Abelson",
          "\"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.\" - Martin Fowler",
          "\"First, solve the problem. Then, write the code.\" - John Johnson",
          "\"Experience is the name everyone gives to their mistakes.\" - Oscar Wilde"
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        printLine(<TerminalPre>{randomQuote}</TerminalPre>);
        return;
      }

      if (cmd === "calc") {
        if (!arg) {
          printLine(<ErrorText>usage: calc &lt;expression&gt;</ErrorText>);
          return;
        }
        try {
          const sanitized = arg.replace(/[^-()\d/*+.]/g, '');
          const result = new Function(`return ${sanitized}`)();
          if (result === undefined || Number.isNaN(result)) throw new Error();
          printLine(<TerminalPre>{String(result)}</TerminalPre>);
        } catch {
          printLine(<ErrorText>calc: invalid expression</ErrorText>);
        }
        return;
      }

      if (cmd === "uptime") {
        const uptimeSeconds = Math.floor(performance.now() / 1000);
        const m = Math.floor(uptimeSeconds / 60);
        const s = uptimeSeconds % 60;
        printLine(<TerminalPre>up {m} minutes, {s} seconds</TerminalPre>);
        return;
      }

      if (cmd === "repo") {
        printLine(<KeyText>Opening GitHub profile in a new tab...</KeyText>);
        window.open("https://github.com/vinayprabhakarx", "_blank");
        return;
      }


      if (cmd === "theme") {
        printLine(<KeyText>To change the theme, please click the moon/sun icon in the top right corner of the navigation bar.</KeyText>);
        return;
      }

      if (cmd === "download") {
        if (arg === "resume" || arg === "resume.pdf") {
           printLine(<KeyText>Downloading resume.pdf...</KeyText>);
           const link = document.createElement("a");
           link.href = "/resume";
           link.setAttribute("download", "Vinay_Resume.pdf");
           document.body.appendChild(link);
           link.click();
           document.body.removeChild(link);
        } else if (arg === "photo" || arg === "photo.png" || arg === "profile") {
           printLine(<KeyText>Downloading photo.png...</KeyText>);
           const link = document.createElement("a");
           link.href = profilePhoto;
           link.setAttribute("download", "Vinay_Photo.png");
           document.body.appendChild(link);
           link.click();
           document.body.removeChild(link);
        } else {
           printLine(<ErrorText>download: {arg || 'missing filename'}: No such file</ErrorText>);
        }
        return;
      }

      if (cmd === "mail" || cmd === "message") {
        startMail();
        return;
      }

      if (cmd === "exit" || cmd === "close") {
        printLine(<ErrorText>closing session...</ErrorText>);
        window.open("", "_self");
        window.close();
        printLine(
          <>
            <ErrorText>your browser blocked that</ErrorText> - tabs not opened by a script cannot be auto-closed.
          </>
        );
        return;
      }

      if (commandOutputs[cmd]) {
        printLine(commandOutputs[cmd]);
        return;
      }

      printLine(
        <>
          <ErrorText>command not found: {cmd}</ErrorText> - type <KeyText>help</KeyText>
        </>
      );
    },
    [addToHistory, currentPath, history, navigate, printLine, printPromptLine, startMail]
  );

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleBodyClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        focusInput();
      }
    },
    [focusInput]
  );

  const handleShellMouseDown = useCallback(
    (event) => {
      if (event.target.closest("a") || event.target.closest("button")) return;
      focusInput();
    },
    [focusInput]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
         // Let the native input handle it, but wait a tick to update cursor
         window.setTimeout(updateCursor, 0);
      }

      if (event.key === "c" && event.ctrlKey) {
        event.preventDefault();
        if (mailFlow) {
          printLine(
            <>
              <Prompt>&gt;</Prompt> {input}^C
            </>
          );
          setMailFlow(null);
        } else {
          printLine(
            <>
              {prompt()} {input}^C
            </>
          );
        }
        setInput("");
        setCursorPos(0);
        return;
      }

      if (event.key === "Enter") {
        if (event.shiftKey) {
          // Allow default behavior (newline in textarea)
          window.setTimeout(updateCursor, 0);
          return;
        }
        
        event.preventDefault();
        
        if (mailFlow) {
          handleMailInput(input);
        } else {
          runCommand(input);
        }
        setInput("");
        setCursorPos(0);
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        const trimmedInput = input.trimStart();
        if (!trimmedInput) return;

        const parts = trimmedInput.split(/\s+/);
        const command = parts[0].toLowerCase();
        const completingArgument = /\s/.test(trimmedInput);
        const argPartial = completingArgument ? parts.slice(1).join(" ").toLowerCase() : "";
        let matches = [];
        let nextInput = "";

        if (!completingArgument) {
          matches = commandNames.filter((name) => name.startsWith(command));
          nextInput = matches[0] || "";
        } else if (command === "cd") {
          const directoryCandidates = ["~", "..", ...pageNames];
          const normalizedPartial = argPartial.replace(/^\//, "");
          matches = directoryCandidates.filter((name) => name.startsWith(normalizedPartial));
          const prefix = argPartial.startsWith("/") && !["~", ".."].includes(matches[0]) ? "/" : "";
          nextInput = matches[0] ? `cd ${prefix}${matches[0]}` : "";
        } else if (command === "cat") {
          matches = fileNames.filter((name) => name.startsWith(argPartial));
          nextInput = matches[0] ? `cat ${matches[0]}` : "";
        } else if (command === "man") {
          matches = Object.keys(manPages).filter((name) => name.startsWith(argPartial));
          nextInput = matches[0] ? `man ${matches[0]}` : "";
        } else if (command === "download") {
          const downloadables = ["resume", "photo"];
          matches = downloadables.filter((name) => name.startsWith(argPartial));
          nextInput = matches[0] ? `download ${matches[0]}` : "";
        }

        if (matches.length === 1) {
          setInput(nextInput);
          window.setTimeout(() => {
            if (inputRef.current) setCursorPos(inputRef.current.value.length);
          }, 0);
        } else if (matches.length > 1) {
          printPromptLine(input);
          printLine(<KeyText>{matches.join("  ")}</KeyText>);
        }
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (history.length === 0) return;
        const nextIndex = Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        const nextInput = history[nextIndex] || "";
        setInput(nextInput);
        window.setTimeout(() => {
           if (inputRef.current) setCursorPos(nextInput.length);
        }, 0);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (history.length === 0) return;
        const nextIndex = Math.min(history.length, historyIndex + 1);
        setHistoryIndex(nextIndex);
        const nextInput = history[nextIndex] || "";
        setInput(nextInput);
        window.setTimeout(() => {
           if (inputRef.current) setCursorPos(nextInput.length);
        }, 0);
      }
    },
    [handleMailInput, history, historyIndex, input, mailFlow, printLine, printPromptLine, runCommand, prompt, updateCursor]
  );


  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    printLine(<FastFetchOutput />);
    printLine(
      <>
        Welcome. Type <KeyText>help</KeyText> to see available commands.
      </>
    );
    focusInput();
  }, [focusInput, printLine]);

  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, input]);

  return (
    <>
      <TerminalColumn>
        <TerminalShell onMouseDown={handleShellMouseDown} onClick={focusInput}>
        <TerminalBar>
          <TerminalTitle>vinay@portfolio: {currentPath}</TerminalTitle>
        </TerminalBar>

        <TerminalBody ref={bodyRef} onMouseDown={handleBodyClick}>
          {lines.map((line) => (
            <TerminalLine key={line.id}>{line.node}</TerminalLine>
          ))}
          <InputLine>
            {prompt()}
            <CurrentInput>
              {input.slice(0, cursorPos)}
              <Cursor>{input.slice(cursorPos, cursorPos + 1) || " "}</Cursor>
              {input.slice(cursorPos + 1)}
            </CurrentInput>
          </InputLine>
        </TerminalBody>
      </TerminalShell>
        <HiddenTerminalInput
          ref={inputRef}
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setCursorPos(event.target.selectionStart || 0);
          }}
          onKeyDown={handleKeyDown}
          onSelect={updateCursor}
          onKeyUp={updateCursor}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-label="Terminal command input"
        />

        <TerminalHint>
          Click the terminal and type <code>help</code>
        </TerminalHint>
      </TerminalColumn>
    </>
  );
};

export default Terminal;
