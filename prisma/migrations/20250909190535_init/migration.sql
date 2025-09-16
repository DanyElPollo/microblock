-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SmartContract" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "network" TEXT NOT NULL DEFAULT 'metis',
    "environment" TEXT NOT NULL DEFAULT 'mainnet',
    "rpcUrl" TEXT NOT NULL,
    "description" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SmartContract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SmartContract_address_key" ON "public"."SmartContract"("address");

-- CreateIndex
CREATE INDEX "SmartContract_userId_idx" ON "public"."SmartContract"("userId");

-- CreateIndex
CREATE INDEX "SmartContract_nombre_idx" ON "public"."SmartContract"("nombre");

-- CreateIndex
CREATE INDEX "SmartContract_network_idx" ON "public"."SmartContract"("network");

-- CreateIndex
CREATE INDEX "SmartContract_environment_idx" ON "public"."SmartContract"("environment");

-- AddForeignKey
ALTER TABLE "public"."SmartContract" ADD CONSTRAINT "SmartContract_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
