import { Router } from "express";
import { advancedFilterLeads, createLead, getallLeads, getLeads } from "../controllers/lead.controllers.js";


const router = Router();

router.route("/addLead").post(createLead)
router.route("/allLeads").get(getallLeads)
router.route("/getLeads").get(getLeads)
router.route("/getAdvFilteredLeads").get(advancedFilterLeads)




export default router