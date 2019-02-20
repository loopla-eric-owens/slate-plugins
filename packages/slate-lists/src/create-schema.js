export default ({ blocks }) => {
  return {
    blocks: {
      [blocks.unordered_list]: {
        nodes: [
          {
            match: { type: blocks.list_item }
          }
        ]
      },
      [blocks.ordered_list]: {
        nodes: [
          {
            match: { type: blocks.list_item }
          }
        ]
      },
      [blocks.list_item]: {
        parent: [
          { type: blocks.unordered_list },
          { type: blocks.ordered_list }
        ],
        nodes: [
          {
            match: [
              { type: blocks.list_item_child },
              { type: blocks.unordered_list },
              { type: blocks.ordered_list }
            ]
          }
        ],
        normalize: (editor, error) => {
          switch (error.code) {
            case "child_type_invalid":
              editor.wrapBlockByKey(error.child.key, {
                type: blocks.list_item_child
              });
              return;
            case "parent_type_invalid":
              editor.wrapBlock(blocks.unordered_list);
              return;
            default:
              return;
          }
        }
      }
    }
  };
};
