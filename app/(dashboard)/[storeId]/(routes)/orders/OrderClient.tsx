"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface OrdersClientProps {
  data: OrderColumn[];
}

const OrdersClient = ({ data }: OrdersClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable entityKey="products" columns={columns} data={data} />
    </>
  );
};

export default OrdersClient;
