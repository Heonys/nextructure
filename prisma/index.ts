// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#solution

import { PrismaClient } from "@prisma/client";

// 싱글톤 패턴으로 prisma client 인스턴스 생성
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// prisma client가 이미 존재하면 사용하고 존재하지 않으면 싱글톤패턴을 사용하여 인스턴스 생성
const prisma = globalThis.prisma ?? prismaClientSingleton();

// 다른 파일에서도 인스턴스를 사용할 수 있게 prisma client 인스턴스를 export
export default prisma;

// 개발환경에서 서버가 리로드 될떄 새로운 prisma client 인스턴스가 생성되는 것을 방지
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
