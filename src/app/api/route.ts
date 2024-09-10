export async function GET() {
    return Response.json(
        { msg: "welcome to the tokopaedi api" },
        { status: 200 }
    );
}
