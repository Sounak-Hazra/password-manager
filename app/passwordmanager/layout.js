import { Inter } from "next/font/google";
import "./../globals.css";
import Leftside from "../components/Leftside";
import VerticalLine from "../components/VerticalLine";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import Wraproot from "../components/Wraproot";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Password manager",
  description: "Manage your passwords safly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Wraproot data={children} />
        </body>
        </html>
  );
}