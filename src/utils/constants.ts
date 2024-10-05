import { Column } from "@components";
import { IPost } from "@interfaces/post.interface";

export const COLUMNS_POST: Column<IPost>[] = [
	{ Header: "ID", accessor: "id" },
	{ Header: "Titulo", accessor: "title" },
	{ Header: "Descripción", accessor: "body" },
];

export const  MAX_BUTTONS = 5;