class ProjectsController < ApplicationController

  def index
    # raise params.inspect
    @projects = current_user.projects
  end

  def new
    # raise params.inspect
    if (params[:client_id]) && @client = Client.find_by_id(params[:client_id])
      @project = @client.projects.build #adds client id to project.
    else
      @project = Project.new
    end
  end

  def create
    # raise params.inspect
    @project = current_user.projects.build(project_params)
      if @project.save
        # set_client_instance_variable
        redirect_to client_project_path(@project.client, @project)
      else
        render :new  #does not request a new get request.  lets us call field w/errors.  Keeps inputted data.  #renders users/new form.
      end
  end

  def show
    # raise params.inspect
    set_project
  end

  def edit
    # raise params.inspect
    set_project
  end

  def update
    # raise params.inspect
    set_project
    if project_user_equals_current_user && @project.update(project_params)
      redirect_to project_path(@project)
    else
      render :edit #allows for field with errors.
    end
  end

  def destroy  #If I delete a project then I need to delete associated projects otherwise the comment will attach to a newly created project???
    set_project
    if project_user_equals_current_user
      @project.destroy
      redirect_to projects_path
    end
  end

  private

  def set_project
    @project = Project.find_by(id: params[:id])
    if !@project
      redirect_to projects_path
    end
  end


  def project_params
    params.require(:project).permit(:name, :description, :target_completion_date, :completion_date, :client_id)
  end


end
