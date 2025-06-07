import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, shadesOfPurple } from "@clerk/themes";
import Header from "@/components/header";
import LayoutWrapper from "@/components/layoutWrapper";
import { Toaster } from "sonner";
import { UserSettingsProvider } from "@/context/userSettingsContext";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Editor.io",
  description: "A modern code and markdown editor for the web",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: shadesOfPurple[500],
          colorText: "#ecf0f4",
          colorBackground: "#1E1E2F",
          colorBorder: "#4A4A6A",
          colorInputBackground: "#2C2C3F",
          colorInputText: "#FFFFFF",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-dusk`}>
          <UserSettingsProvider>
            <Header />
            <LayoutWrapper>{children}</LayoutWrapper>
            <Toaster richColors />
          </UserSettingsProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
