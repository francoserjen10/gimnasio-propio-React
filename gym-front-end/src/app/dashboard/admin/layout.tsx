import LayoutAdmin from "@/components/layouts/layoutAdmin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <LayoutAdmin>{children}</LayoutAdmin>;
}