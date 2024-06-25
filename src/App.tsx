import { useCallback, useState } from "react";

import Complete from "./components/Complete";
import Form from "./components/Form";
import Layout from "./components/Layout";

const App = () => {
  const [formComplete, setFormComplete] = useState(false);

  const onComplete = useCallback(() => setFormComplete(true), [setFormComplete]);

  return <Layout>{!formComplete ? <Form onComplete={onComplete} /> : <Complete />}</Layout>;
};

export default App;
