import { Outlet } from "umi";

export default function Layout() {
  return (
    <div className="bg-[#181a1f] w-screen h-screen flex flex-col overflow-hidden text-white/90">
      <Outlet />
    </div>
  );
}
