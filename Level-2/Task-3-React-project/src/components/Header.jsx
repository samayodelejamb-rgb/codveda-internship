export default function Header({ name }) {
  return (
    <div className="header">
      <div>
        <h1 className="header-title">Good evening, {name} 👋</h1>
        <p className="header-subtitle">Lets finish with Codveda on time.</p>
      </div>
      <div className="avatar">{name.charAt(0)}</div>
    </div>
  );
}
