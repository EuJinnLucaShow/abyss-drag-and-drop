import { FC, memo } from "react";
import { IChildTree } from "../../context/ChildTreeContext";
import { useChildTree } from "../../hooks/useChildTree";
import Child from "../Child/Child";

const Tree: FC<{ keys?: string[]; tree: IChildTree }> = ({
  keys = [],
  tree,
}) => {
  const { handleDelete, handleEdit, handleAdd } = useChildTree();

  return (
    <>
      {Object.keys(tree).map((key) => {
        const item = tree[key];
        const childrenCount = Object.keys(item.children).length;
        const isMoreThenOneElement = Object.keys(tree).length > 1;
        const isItemHasMoreThenOneElement =
          Object.keys(item.children).length > 1;
        const keysArr = [...keys, key];
        const currentKey = keysArr.join("/");
        return (
          <div
            className={`px-2 relative flex flex-col items-center [&>div.horizontal-line]:last:w-1/2 [&>div.horizontal-line]:first:w-1/2 [&>div.horizontal-line]:first:right-0 [&>div.horizontal-line]:last:left-0`}
            key={key}
          >
            {!item?.isDefaultChild && (
              <>
                {isMoreThenOneElement && (
                  <div
                    style={{ height: 1 }}
                    className="horizontal-line w-full bg-gray-800 absolute"
                  />
                )}
                <div style={{ width: 1 }} className="h-14 bg-gray-800" />
              </>
            )}
            <Child
              isDefaultChild={item?.isDefaultChild}
              text={item.text}
              addChild={() => {
                handleAdd(currentKey);
              }}
              deleteChild={() => handleDelete(currentKey)}
              onChange={(value) => {
                handleEdit(currentKey, value);
              }}
            />
            <div className="">
              {isItemHasMoreThenOneElement && (
                <div style={{ width: 1 }} className="h-14 bg-gray-800 m-auto" />
              )}
              <div className="flex justify-center">
                {childrenCount ? (
                  <Tree tree={item.children} keys={keysArr} />
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default memo(Tree);
