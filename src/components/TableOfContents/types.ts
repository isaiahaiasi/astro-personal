export interface Heading {
	depth: number;
	slug: string;
	text: string;
}

export interface NestedHeading extends Heading {
	children?: NestedHeading[];
}