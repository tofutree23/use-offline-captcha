import React from "react";

import useOfflineCatpcha from "use-offline-captcha";

const App = () => {
  const ref = React.useRef();
  const [value, setValue] = React.useState();

  const { gen, validate } = useOfflineCatpcha(ref, {
    type: "mixed",
  });

  React.useEffect(() => {
    if (gen) {
      gen();
    }
  }, [gen]);

  const handleClick = () => gen();

  const handleValidate = () => {
    const result = validate(value);
    if (!result) gen();

    setValue("");
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
        }}
      >
        <div ref={ref}></div>
        <div style={{ display: "flex" }}>
          <input onChange={(e) => setValue(e.target.value)} value={value} />
          <button onClick={handleValidate}>validate</button>
        </div>
      </div>
      <button onClick={handleClick}>refresh</button>
    </div>
  );
};
export default App;
