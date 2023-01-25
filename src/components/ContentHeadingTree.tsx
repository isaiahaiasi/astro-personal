import { h } from "preact";

interface Heading {
	depth: number;
	slug: string;
	text: string;
	children?: Heading[]
}

interface HeadingSubtreeProps {
	heading: Heading
}


export default function HeadingTree({ heading }: HeadingSubtreeProps) {
	return <li>
		<a href={`#${heading.slug}`}>{heading.text}</a>
		{heading.children &&
			<ul>
				{heading.children.map(child => <HeadingTree heading={child} />)}
			</ul>
		}
	</li>
}
