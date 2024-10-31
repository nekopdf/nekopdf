# Demo

## General Markdown

This is a paragraph.

This is another paragraph.

This is a list:

- Item 1
- Item 2
- Item 3

This is a numbered list:

1. Item 1
2. Item 2
3. Item 3

This is a table:

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Item 1   | Item 2   | Item 3   |
| Item 4   | Item 5   | Item 6   |
| Item 7   | Item 8   | Item 9   |

This is a blockquote:

> This is a blockquote.

This is **bold** text.

This is _italic_ text.

This is ~~strikethrough~~ text.

This is **underline** text.

This is `inline code`.

This is a link: [NekoPDF](https://github.com/OfficialCRUGG/nekopdf)

## Code Blocks

This is a code block:

```ts
import { greet } from "./greet";
console.log(greet("World")); // Hello, World!
```

```md
# This is a Markdown code block

This is **bold** text.
```

```elixir
defmodule Hello do
  def world do
    IO.puts "Hello, World!"
  end
end
```

## Images

This is an image:

![OfficialCRUGG](https://github.com/OfficialCRUGG.png)

## LaTeX

This is inline LaTeX: $\vec{u} \cdot \vec{v}$

This is a block LaTeX:

$$
\begin{aligned}
\frac{d}{dx} \int_{a}^{x} f(t) \, dt &= f(x) \\
\int_{a}^{b} f(x) \, dx &= F(b) - F(a)
\end{aligned}
$$

## HTML

This is an HTML block:

<details>
  <summary>Click to expand!</summary>
  <p>This is a paragraph.</p>
  <p>This is another paragraph.</p>
</details>

## Footnotes

This is a footnote[^1]. This is another footnote[^2].

## Ending

This is the end of the demo.

[^1]: This is a footnote.
[^2]: This is another footnote.
