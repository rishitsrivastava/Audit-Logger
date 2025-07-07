import { getLogsBySession, simulateRequests } from "../services/replayService.js";

export default async function replaySession(req, res) {
  try {
    const sessionId = req.params.sessionId;
    const logs = await getLogsBySession(sessionId);

    if (logs.length == 0) {
      return res
        .status(404)
        .json({ message: "No logs found from this session" });
    }

    const replayResult = await simulateRequests(logs);

    res.json({ message: "Replay completed: ", replayResult });
  } catch (err) {
    console.error("replay error(from within the replayController.js) : ", err);
    res
      .status(500)
      .json({
        message:
          "Server error during replay(from within the replayController.js)",
      });
  }
}
