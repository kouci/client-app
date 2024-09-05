declare namespace chrome {
    namespace runtime {
      function sendMessage(message: any, callback: (response: any) => void): void;
      const id: string;
    }
    namespace storage {
      namespace sync {
        function set(items: { [key: string]: any }, callback?: () => void): void;
        function get(keys: string | string[] | { [key: string]: any }, callback: (items: { [key: string]: any }) => void): void;
      }
    }
  }