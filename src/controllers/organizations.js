import {
	getAllOrganizations,
	getOrganizationById,
} from "../models/organizations.js";
import { getProjectByOrganizationId } from "../models/project.js";

const organizationsPageController = async (req, res) => {
	const organizations = await getAllOrganizations();
	const title = "Our Partner Organizations";
	res.render("organizations", { title, organizations });
};

const showOrganizationDetailsPage = async (req, res) => {
	const organizationId = req.params.id;
	const organizationDetails = await getOrganizationById(organizationId);
	const projects = await getProjectByOrganizationId(organizationId);
	const title = "Organization Details";

	res.render("organizationDetails", {
		title,
		organization: organizationDetails,
		projects,
	});
};

export { organizationsPageController, showOrganizationDetailsPage };
