import { GitHubUserDTO } from "./github-user-dto.interface";

export interface GitHubRepoDTO {
  id:                          number;
  node_id:                     string;
  name:                        string;
  full_name:                   string;
  private:                     boolean;
  owner:                       GitHubUserDTO;
  html_url:                    string;
  description:                 null | string;
  fork:                        boolean;
  url:                         string;
  languages_url:               string;
  stargazers_url:              string;
  contents_url:                string;
  compare_url:                 string;
  merges_url:                  string;
  archive_url:                 string;
  downloads_url:               string;
  issues_url:                  string;
  pulls_url:                   string;
  milestones_url:              string;
  notifications_url:           string;
  labels_url:                  string;
  releases_url:                string;
  deployments_url:             string;
  git_url:                     string;
  stargazers_count:            number;
  watchers_count:              number;
  language:                    string | null;
}
