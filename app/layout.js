import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer, toast,Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Password manager",
  description: "Manage your passwords safly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastContainer position="top-center"  transition={Zoom}  />
        {children}
      </body>
    </html>
  );
}
