export const scheduleAction = {
  find: {
    all: {
      start: "schedule/find/all/start",
      success: "schedule/find/all/success",
      fail: "schedule/find/all/fail"
    }
  },
  archive: {
    by: {
      schedule: {
        id: {
          start: "schedule/archive/by/schedule/id/start",
          success: "schedule/archive/by/schedule/id/success",
          fail: "schedule/archive/by/schedule/id/fail"
        }
      }
    }
  },
}