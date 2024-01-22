import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>환영합니다 {session && <span>{session.user!.name}</span>}님 반갑습니다</h1>
    </main>
  );
}
