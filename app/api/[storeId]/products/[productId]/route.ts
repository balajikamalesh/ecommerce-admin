import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

//GET individual product
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; productId: string };
  }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product is Required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

//UPDATE specific product for a given store
export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; productId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!name) {
      return new NextResponse("Name is Required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is Required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category is Required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("Color is Required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("Size is Required", { status: 400 });
    }

    if (!images || images.length == 0) {
      return new NextResponse("Images are Required", { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse("Product is Required", { status: 400 });
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

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        isFeatured,
        isArchived,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

//DELETE given product for given store
export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; productId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("Product is Required", { status: 400 });
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

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
