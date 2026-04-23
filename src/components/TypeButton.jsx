import { useState, useEffect, memo } from "react";

export const TypeButton = memo(({ type, isActive, onClick, get_filter_value, getDetailsOfSelectedType }) => {
  const [iconUrl, setIconUrl] = useState(null);

  useEffect(() => {
    if (type.name !== "all") {
      const typeId = get_filter_value(type.url);
      getDetailsOfSelectedType(typeId).then(data => {
        const sprite = data[0].sprites['generation-viii']['brilliant-diamond-shining-pearl'].symbol_icon;
        setIconUrl(sprite);
      });
    }
  }, [type, get_filter_value, getDetailsOfSelectedType]);

  return (
    <button className={isActive ? 'active-filter' : 'type-header'} onClick={onClick}>
      {iconUrl && <img src={iconUrl} alt="" style={{ width: '20px', marginRight: '5px' }} />}
      {type.name}
    </button>
  );
});