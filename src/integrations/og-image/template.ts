import type { SatoriOptions } from 'satori';

export interface ArticleOgTemplateProps {
  title: string;
  tags: string[];
}

export const articleOgTemplate = ({ title, tags }: ArticleOgTemplateProps) => ({
  type: 'div',
  props: {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      padding: '60px',
    },
    children: [
      {
        type: 'div',
        props: {
          style: {
            color: '#94a3b8',
            fontSize: '28px',
            fontWeight: 400,
          },
          children: 'sungyujang.com',
        },
      },
      {
        type: 'div',
        props: {
          style: {
            color: '#f8fafc',
            fontSize: '56px',
            fontWeight: 700,
            marginTop: 'auto',
            lineHeight: 1.3,
            wordBreak: 'keep-all',
          },
          children: title,
        },
      },
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            gap: '12px',
            marginTop: '32px',
            flexWrap: 'wrap',
          },
          children: tags.slice(0, 4).map((tag) => ({
            type: 'span',
            props: {
              style: {
                background: '#334155',
                color: '#cbd5e1',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '22px',
                fontWeight: 400,
              },
              children: tag,
            },
          })),
        },
      },
    ],
  },
});

export const defaultOgTemplate = () => ({
  type: 'div',
  props: {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      gap: '40px',
    },
    children: [
      {
        type: 'svg',
        props: {
          width: 160,
          height: 160,
          viewBox: '0 0 128 128',
          children: [
            {
              type: 'path',
              props: {
                d: 'M34 22c-7 0-11 4-11 11v22c0 7-3 11-11 11 8 0 11 4 11 11v22c0 7 4 11 11 11',
                fill: 'none',
                stroke: '#f1f5f9',
                strokeWidth: 6.5,
                strokeLinecap: 'round',
              },
            },
            {
              type: 'path',
              props: {
                d: 'M94 22c7 0 11 4 11 11v22c0 7 3 11 11 11-8 0-11 4-11 11v22c0 7-4 11-11 11',
                fill: 'none',
                stroke: '#f1f5f9',
                strokeWidth: 6.5,
                strokeLinecap: 'round',
              },
            },
            {
              type: 'path',
              props: {
                d: 'M46 85 C48 61 52 47 58 43 C62 40 66 42 65 47',
                fill: 'none',
                stroke: '#f1f5f9',
                strokeWidth: 5,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
              },
            },
            {
              type: 'path',
              props: {
                d: 'M43 63 L62 63',
                fill: 'none',
                stroke: '#f1f5f9',
                strokeWidth: 5,
                strokeLinecap: 'round',
              },
            },
            {
              type: 'path',
              props: {
                d: 'M68 67 L84 65 C82 55 77 51 72 53 C66 55 64 63 66 73 C68 81 72 84 78 82 C81 81 83 78 84 75',
                fill: 'none',
                stroke: '#f1f5f9',
                strokeWidth: 5,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
              },
            },
          ],
        },
      },
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  color: '#f8fafc',
                  fontSize: '48px',
                  fontWeight: 700,
                },
                children: 'jsg / frontend developer',
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  color: '#94a3b8',
                  fontSize: '28px',
                  fontWeight: 400,
                },
                children: 'sungyujang.com',
              },
            },
          ],
        },
      },
    ],
  },
});

export const satoriOptions = (fonts: SatoriOptions['fonts']): SatoriOptions => ({
  width: 1200,
  height: 630,
  fonts,
});
