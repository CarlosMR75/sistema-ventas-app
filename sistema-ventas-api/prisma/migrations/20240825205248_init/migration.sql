-- CreateTable
CREATE TABLE "rol" (
    "cverol" SERIAL NOT NULL,
    "descripcion" VARCHAR(250) NOT NULL,
    "clave" VARCHAR(45) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("cverol")
);

-- CreateTable
CREATE TABLE "tbl_usuario" (
    "cveusuario" SERIAL NOT NULL,
    "nombre" VARCHAR(250) NOT NULL,
    "apellidos" VARCHAR(600) NOT NULL,
    "username" VARCHAR(150) NOT NULL,
    "password" VARCHAR(800) NOT NULL,
    "fecharegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cverol" INTEGER NOT NULL,

    CONSTRAINT "tbl_usuario_pkey" PRIMARY KEY ("cveusuario")
);

-- AddForeignKey
ALTER TABLE "tbl_usuario" ADD CONSTRAINT "tbl_usuario_cverol_fkey" FOREIGN KEY ("cverol") REFERENCES "rol"("cverol") ON DELETE RESTRICT ON UPDATE CASCADE;
