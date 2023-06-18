import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';

const CustomLink = (props) => {
    const href = props.href;

    if (href.startsWith('/')) {
        return (
            <Link {...props}>
                {props.children}
            </Link>
        )
    }

    if (href.startsWith('#')) {
        return <a {...props} />;
    }

    return <a target='_blank' rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
    return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

const components = {
    Image: RoundedImage,
    a: CustomLink
}

export function Mdx({ code }) {
    const Component = useMDXComponent(code);

    return (
        <div id="article-container">
            <Component components={components} />
        </div>
    )
}