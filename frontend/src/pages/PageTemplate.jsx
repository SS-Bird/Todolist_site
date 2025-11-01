// src/pages/PageTemplate.jsx
import Breadcrumbs from "../components/Breadcrumbs";

function PageTemplate({ title, breadcrumbs = [], children }) {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div>{children}</div>
    </div>
  );
}

export default PageTemplate;