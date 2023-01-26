import { h } from "preact";
import type { NestedHeading } from "./types";

interface HeadingSubtreeProps {
	heading: NestedHeading
}


export default function HeadingSubtree({ heading }: HeadingSubtreeProps) {
	return <li>
		<a href={`#${heading.slug}`}>{heading.text}</a>
		{heading.children &&
			<ul>
				{heading.children.map(child => <HeadingSubtree heading={child} />)}
			</ul>
		}
	</li>
}
