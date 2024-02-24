"use client"

import { useState } from "react";
import { marked } from "marked";
import DomPurify from "isomorphic-dompurify";

export default function Home() {

  const [innerHTML, setInnerHTML] = useState("# Hello World\n\n## This is a certification project in [FreeCodeCamp](https://www.freecodecamp.org/)\n\nPlease feel free to edit this [textarea](http://www.google.com).\n\n- Kyle Stephen Tancio");


  const handleEditorOnChange = (e:any) => {
    setInnerHTML(e.target.value);
  }

  return (
    <main className="w-screen h-[calc(100vh-4rem)] grid grid-cols-2 p-3 gap-3">
      <div className="h-full">
        <textarea id="editor" className="h-full w-full" value={innerHTML} onChange={handleEditorOnChange}></textarea>
      </div>
      <div className="h-full">
        <div 
          id="preview" 
          className="w-full h-full" 
          dangerouslySetInnerHTML={
            {
              __html: DomPurify.sanitize(marked.parse(innerHTML, { async: false, breaks: true,  }) as string)
            }
          }>
        </div>
      </div>
    </main>
  );
}
