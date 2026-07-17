# Modern Liferay Portfolio

A framework-free Web Component packaged as a Liferay Custom Element Client Extension. It recreates the dark portfolio direction from the supplied Figma overview while keeping the implementation isolated from the legacy Next.js 10 application.

## Why this shape

- Custom Element Client Extensions are the modern Liferay integration boundary for independently built frontend applications.
- No React or portal bundle coupling is required.
- The component can be placed on a Content Page like a widget.
- The visual system is scoped under the `modern-portfolio` element to avoid leaking styles into Liferay administration or other page fragments.

## Files

```text
liferay/client-extensions/modern-portfolio/
├── assets/
│   ├── index.js
│   └── style.css
├── preview/
│   └── index.html
├── client-extension.yaml
└── README.md
```

## Use in a Liferay workspace

Copy this folder into:

```text
<liferay-workspace>/client-extensions/modern-portfolio
```

Deploy it from the client extension folder:

```bash
../../gradlew clean deploy
```

Then add **Modern Portfolio** to a Liferay Content Page from the widget/client extension palette.

## Supported element attributes

```html
<modern-portfolio
    display-name="Hưng"
    headline="Liferay & AEM Developer"
    location="Ho Chi Minh City, Vietnam"
    contact-email="hello@example.com"
></modern-portfolio>
```

`contact-email` is intentionally empty by default. The form uses a `mailto:` handoff until a real Headless API or Object Action endpoint is connected.

## Local preview

Serve the repository root with any static server and open:

```text
/liferay/client-extensions/modern-portfolio/preview/
```

Example:

```bash
python3 -m http.server 4173
```

## Recommended Liferay page architecture

1. Create a Master Page Template for global header/footer and a Drop Zone.
2. Apply a Style Book or Theme CSS Client Extension for shared site-level tokens.
3. Place this Custom Element on a Content Page Template for the portfolio page.
4. Once final copy and assets are approved, split author-managed content into Fragments and keep only interactive behavior in the Custom Element.

## Current limitations

- Visual values are inferred from a zoomed-out Figma screenshot, not original node data.
- Portrait and project imagery are CSS placeholders.
- Contact submission is not connected to a backend.
