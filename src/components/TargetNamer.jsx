function TargetNamer({targetData}) {


  return (
    <select name="targetNamer" id="targetNamer">
      {targetData.map((target) => {
        return (
          <option key={target.id} id={target.key}>
            {target.name}
          </option>
        );
      })}
    </select>
  );
}

export default TargetNamer;
