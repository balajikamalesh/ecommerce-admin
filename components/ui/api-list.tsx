"use client";

import { useParams } from "next/navigation";
import { useOrigin } from "../../hooks/use-origin";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList = ({ entityName, entityIdName }: ApiListProps) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        variant="public"
        title="GET"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        variant="public"
        title="GET"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        variant="admin"
        title="POST"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        variant="admin"
        title="PATCH"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        variant="admin"
        title="DELETE"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};

export default ApiList;
