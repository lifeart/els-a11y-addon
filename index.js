const aria = require("aria-query");

const elementRoles = {};
aria.elementRoles.forEach((value, { name }) => {
  elementRoles[name] = Array.from(value);
});
const areas = {};
aria.aria.forEach((value, name) => {
    areas[name] = value;
});
function isAttributeValue(focusPath) {
    return  focusPath.node.type === "TextNode" &&
    focusPath.parent.type === "AttrNode";
}
module.exports.onComplete = function(_, { focusPath, results, type }) {
  if (type !== "template") {
    return results;
  }
  if (
    isAttributeValue(focusPath)
  ) {
    let attributeName = focusPath.parent.name;
    let tag = focusPath.parentPath.parent;
    if (tag.name in elementRoles && attributeName === "role") {
      elementRoles[tag.name].forEach(name => {
        results.push({
          label: name
        });
      });
    } else if (attributeName in areas && areas[attributeName].type === 'tokenlist') {
        areas[attributeName].values.forEach(name => {
            results.push({
              label: name
            });
        });
    }
  }

  return results;
};
