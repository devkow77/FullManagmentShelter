UPDATE "Adoption"
SET "status" = 'OCZEKUJACY_NA_WIZYTE'
WHERE "status" = 'ZAAKCEPTOWANY';

UPDATE "Adoption"
SET "status" = 'ZAAKCEPTOWANY'
WHERE "status" = 'ZAKONCZONY';

CREATE TYPE "AdoptionStatus_new" AS ENUM (
  'OCZEKUJACY',
  'OCZEKUJACY_NA_WIZYTE',
  'ZAAKCEPTOWANY',
  'ODRZUCONY',
  'ANULOWANY'
);

ALTER TABLE "Adoption" ALTER COLUMN "status" DROP DEFAULT;

ALTER TABLE "Adoption"
  ALTER COLUMN "status" TYPE "AdoptionStatus_new"
  USING ("status"::text::"AdoptionStatus_new");

ALTER TABLE "Adoption" ALTER COLUMN "status" SET DEFAULT 'OCZEKUJACY';

DROP TYPE "AdoptionStatus";

ALTER TYPE "AdoptionStatus_new" RENAME TO "AdoptionStatus";
