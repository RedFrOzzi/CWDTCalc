const Footer: React.FC = () => {
  return (
    <div
      style={{
        width: "600px",
        color: "rgb(195, 195, 195)",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        textAlign: "left",
        marginTop: "5px",
      }}
    >
      <span>
        Original QWDT calculator{" "}
        <a
          href="https://returnx.github.io/cwdt/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LINK
        </a>
      </span>
    </div>
  );
};

export default Footer;
