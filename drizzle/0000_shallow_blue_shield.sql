CREATE TABLE "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"sku" text NOT NULL,
	"category" text,
	"stock" integer DEFAULT 0 NOT NULL,
	"min_stock" integer DEFAULT 5 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "items_sku_unique" UNIQUE("sku")
);
