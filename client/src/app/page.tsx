"use client";
import {SessionProvider} from "next-auth/react"
import UserButton from "../component/user-button";
import { Navbar } from "@/component/shared/navbar";

const Home = () => {
  return (
  <div>
      <div>
      <SessionProvider>
        <UserButton />
      </SessionProvider>
    </div>
    <div>
      <Navbar />
    </div>
  </div>
  );
};

export default Home;