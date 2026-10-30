import Reveal from './Reveal'

export default function SplitText({ text, className = '', as = 'h2', delay = 0, once = true }) {
  const lines = Array.isArray(text) ? text : [text]
  return <Reveal as={as} className={className} delay={delay} once={once}>{lines.map((line, i) => <span className="block" key={i}>{line}</span>)}</Reveal>
}
