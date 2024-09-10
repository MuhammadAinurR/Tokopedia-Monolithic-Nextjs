import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css"; // Ensure this imports your global styles
import { CookiesProvider } from "next-client-cookies/server";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create an instance of the Inter font
const inter = Roboto({
    subsets: ["latin"],
    weight: "300",
});

export const metadata: Metadata = {
    title: "Tokopaedi",
    description: "Tokopedia Clone Project",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* <body className={`${inter.className} nunito`}>{children}</body> */}
            <body>
                <ToastContainer />
                <CookiesProvider>{children}</CookiesProvider>
            </body>
        </html>
    );
}
