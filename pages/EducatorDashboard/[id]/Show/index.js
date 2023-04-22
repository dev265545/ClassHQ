import React from "react";
import Template1 from "../../../../components/Template1/Template1";
import { useRouter } from "next/router";

function Show() {
  const router = useRouter()
  const id  = router?.query?.id
  return (
    <div>
      <Template1 id={id} />
    </div>
  );
}

export default Show;
