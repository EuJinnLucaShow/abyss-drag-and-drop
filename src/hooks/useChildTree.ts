import { useCallback, useContext, useMemo } from "react";
import { ChildTreeContext, IChildTree } from "../context/ChildTreeContext";

export const useChildTree = () => {
  const { setTree } = useContext(ChildTreeContext);

  const getChildById = useCallback((tree: IChildTree, id: string) => {
    const splitIds = id.split("/");
    const finder = (
      sTree: IChildTree,
      sIds: string[]
    ): { text: string; children: IChildTree } | null => {
      const key = sIds[0];
      if (Object.keys(sTree?.[key]?.children || {}).length && sIds.length > 1) {
        sIds.shift();
        return finder(sTree[key].children, [...sIds]);
      }
      return sTree[key];
    };
    return finder(tree, [...splitIds]);
  }, []);

  const getParentById = useCallback(
    (
      tree: IChildTree,
      id: string
    ): { parent: IChildTree["key"] | null; childId: string } => {
      const childIdList = id.split("/");
      const childId = childIdList.pop();

      return {
        parent: getChildById(tree, childIdList.join("/")),
        childId: childId || "",
      };
    },
    []
  );

  const handleEdit = useCallback(
    (id: string, value: string) => {
      setTree?.((prevState) => {
        const updatedTree: IChildTree = { ...prevState };
        const { parent, childId } = getParentById(updatedTree, id);

        if (parent) {
          parent.children[childId].text = value;
        }
        return updatedTree;
      });
    },
    [getParentById]
  );

  const handleDelete = useCallback(
    (id: string) => {
      setTree?.((prevState) => {
        const updatedTree = { ...prevState };
        const { parent, childId } =
          id === "parent" ? updatedTree : getParentById(updatedTree, id);

        if (parent) {
          delete parent.children?.[childId as string];
        }
        return updatedTree;
      });
    },
    [getParentById]
  );

  const handleAdd = useCallback((id: string) => {
    setTree?.((prevState) => {
      const updatedTree = { ...prevState };
      const { parent, childId } =
        id === "parent" ? updatedTree : getParentById(updatedTree, id);
      if (parent) {
        if (childId) {
          const childCount = Object.keys(
            parent.children[childId as string].children
          ).length;

          parent.children[childId as string].children[
            `child_${childCount + 1}`
          ] = {
            text: "",
            children: {},
          };
        } else {
          const childCount = Object.keys(parent.children).length;
          parent.children[`child_${childCount + 1}`] = {
            text: "",
            children: {},
          };
        }
      }
      return updatedTree;
    });
  }, []);

  return useMemo(
    () => ({
      handleAdd,
      handleDelete,
      handleEdit,
    }),
    [handleAdd, handleDelete, handleEdit]
  );
};
