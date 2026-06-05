-- ==========================================
-- Clean tables and set up initial schema and data for the service project application
-- ==========================================

DROP TABLE IF EXISTS
    service_project_category,
    service_project,
    categories,
    organization
CASCADE;

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
    organization_id INTEGER NOT NULL,

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

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

INSERT INTO roles (role_name, role_description) VALUES 
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
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

-- Organization 1
(1, 'Community Housing Project', 'Construction of affordable housing units.', 'Denver, Colorado', '2026-01-10'),
(1, 'School Renovation Program', 'Renovating classrooms and school facilities.', 'Phoenix, Arizona', '2026-02-15'),
(1, 'Clean Water Infrastructure', 'Installing sustainable water systems.', 'Dallas, Texas', '2026-03-12'),
(1, 'Public Park Restoration', 'Rebuilding parks and public recreation areas.', 'Seattle, Washington', '2026-04-08'),
(1, 'Disaster Relief Construction', 'Temporary shelter construction for disaster victims.', 'Miami, Florida', '2026-05-01'),

-- Organization 2
(2, 'Urban Garden Initiative', 'Building community vegetable gardens.', 'Portland, Oregon', '2026-01-20'),
(2, 'School Farming Program', 'Teaching students sustainable agriculture.', 'San Diego, California', '2026-02-10'),
(2, 'Neighborhood Compost Project', 'Promoting composting and waste reduction.', 'Austin, Texas', '2026-03-05'),
(2, 'Food Security Program', 'Growing food for underserved families.', 'Atlanta, Georgia', '2026-04-14'),
(2, 'Greenhouse Expansion', 'Building greenhouses for year-round food production.', 'Nashville, Tennessee', '2026-05-22'),

-- Organization 3
(3, 'Community Food Drive', 'Organizing food donations for families in need.', 'Chicago, Illinois', '2026-01-30'),
(3, 'Senior Support Visits', 'Volunteer visits to elderly community members.', 'Boston, Massachusetts', '2026-02-18'),
(3, 'Youth Mentorship Program', 'Connecting youth with volunteer mentors.', 'Charlotte, North Carolina', '2026-03-25'),
(3, 'Charity Fundraising Event', 'Organizing fundraising campaigns.', 'Houston, Texas', '2026-04-19'),
(3, 'Neighborhood Cleanup Day', 'Community volunteers cleaning public spaces.', 'Orlando, Florida', '2026-05-28');

INSERT INTO service_project_category (
    project_id,
    category_id
)
VALUES

-- Community Housing Project
(1, 1),
(1, 5),

-- School Renovation Program
(2, 1),
(2, 4),

-- Clean Water Infrastructure
(3, 1),
(3, 5),

-- Public Park Restoration
(4, 1),
(4, 5),

-- Disaster Relief Construction
(5, 1),

-- Urban Garden Initiative
(6, 2),
(6, 5),

-- School Farming Program
(7, 2),
(7, 4),

-- Neighborhood Compost Project
(8, 2),
(8, 5),

-- Food Security Program
(9, 2),
(9, 3),

-- Greenhouse Expansion
(10, 2),
(10, 5),

-- Community Food Drive
(11, 3),

-- Senior Support Visits
(12, 3),

-- Youth Mentorship Program
(13, 3),
(13, 4),

-- Charity Fundraising Event
(14, 3),

-- Neighborhood Cleanup Day
(15, 3),
(15, 5);