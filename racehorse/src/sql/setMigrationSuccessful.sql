UPDATE ${migrationTable~} SET success=true AND modified_at=now() WHERE id=${migrationId~};
