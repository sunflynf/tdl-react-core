const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>
        Looks like you've stumbled into the void. Or maybe just a typo in the
        URL.
      </p>
      <img
        src="https://media.giphy.com/media/l0HlRnAWXxn0MvKLK/giphy.gif"
        alt="Confused Travolta"
        style={{ maxWidth: "500px", marginTop: "20px" }}
      />
      <p style={{ marginTop: "20px" }}>
        Don't worry, it happens to the best of us. Let's get you back on track!
      </p>
      <a
        href="/"
        style={{ textDecoration: "none", color: "blue", fontSize: "1.2em" }}
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
