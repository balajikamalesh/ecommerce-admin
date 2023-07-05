import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const firstStoreOfUser = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (firstStoreOfUser) {
    redirect(`/${firstStoreOfUser.id}`);
  }

  return <>{children}</>;
}
