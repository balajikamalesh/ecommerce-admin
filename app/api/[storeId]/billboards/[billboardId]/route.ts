import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

//GET individual billboard
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; billboardId: string };
  }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard is Required", { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

//UPDATE specific billboard for a given store
export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; billboardId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!label) {
      return new NextResponse("Label is Required", { status: 400 });
    }

    if (!label) {
      return new NextResponse("Image is Required", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard is Required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

//DELETE given billboard for given store
export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; billboardId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard is Required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
