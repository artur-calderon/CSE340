CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL UNIQUE,

    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

CREATE TABLE service_project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_spc_project
        FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_spc_category
        FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
        ON DELETE CASCADE
);


INSERT INTO categories (name)
VALUES
    ('Construction'),
    ('Agriculture'),
    ('Community Service'),
    ('Education'),
    ('Sustainability');

INSERT INTO service_project (
    organization_id,
    title,
    description,
    location,
    date
)
VALUES
(
    1,
    'Community Housing Development',
    'Building affordable and sustainable housing solutions for underserved communities.',
    'Denver, Colorado',
    '2026-05-10'
),
(
    2,
    'Urban Farming Initiative',
    'Creating community gardens and teaching sustainable food production.',
    'Portland, Oregon',
    '2026-05-15'
),
(
    3,
    'Volunteer Outreach Program',
    'Connecting volunteers with local charities and community service opportunities.',
    'Austin, Texas',
    '2026-05-20'
);



INSERT INTO service_project_category (
    project_id,
    category_id
)
VALUES
    -- BrightFuture Builders
    (1, 1), -- Construction
    (1, 5), -- Sustainability

    -- GreenHarvest Growers
    (2, 2), -- Agriculture
    (2, 4), -- Education
    (2, 5), -- Sustainability

    -- UnityServe Volunteers
    (3, 3), -- Community Service
    (3, 4); -- Education
    
INSERT INTO service_project (
    organization_id,
    title,
    description,
    location,
    date
)
VALUES

-- Organization 1: BrightFuture Builders
(1, 'Community Housing Project', 'Construction of affordable housing units.', 'Denver, Colorado', '2026-01-10'),
(1, 'School Renovation Program', 'Renovating classrooms and school facilities.', 'Phoenix, Arizona', '2026-02-15'),
(1, 'Clean Water Infrastructure', 'Installing sustainable water systems.', 'Dallas, Texas', '2026-03-12'),
(1, 'Public Park Restoration', 'Rebuilding parks and public recreation areas.', 'Seattle, Washington', '2026-04-08'),
(1, 'Disaster Relief Construction', 'Temporary shelter construction for disaster victims.', 'Miami, Florida', '2026-05-01'),

-- Organization 2: GreenHarvest Growers
(2, 'Urban Garden Initiative', 'Building community vegetable gardens.', 'Portland, Oregon', '2026-01-20'),
(2, 'School Farming Program', 'Teaching students sustainable agriculture.', 'San Diego, California', '2026-02-10'),
(2, 'Neighborhood Compost Project', 'Promoting composting and waste reduction.', 'Austin, Texas', '2026-03-05'),
(2, 'Food Security Program', 'Growing food for underserved families.', 'Atlanta, Georgia', '2026-04-14'),
(2, 'Greenhouse Expansion', 'Building greenhouses for year-round food production.', 'Nashville, Tennessee', '2026-05-22'),

-- Organization 3: UnityServe Volunteers
(3, 'Community Food Drive', 'Organizing food donations for families in need.', 'Chicago, Illinois', '2026-01-30'),
(3, 'Senior Support Visits', 'Volunteer visits to elderly community members.', 'Boston, Massachusetts', '2026-02-18'),
(3, 'Youth Mentorship Program', 'Connecting youth with volunteer mentors.', 'Charlotte, North Carolina', '2026-03-25'),
(3, 'Charity Fundraising Event', 'Organizing fundraising campaigns.', 'Houston, Texas', '2026-04-19'),
(3, 'Neighborhood Cleanup Day', 'Community volunteers cleaning public spaces.', 'Orlando, Florida', '2026-05-28');
    
    
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


