class TasksController < ApplicationController

  def index
    render json: Task.order(:id)
  end

  def update
    task = Task.find(params[:id])              #find the task first
    task.update_attributes(task_params)        #update the task attributes, specifically the parameters
    render json: task                          # after you update the task, render the task in json
  end

  def create
    task = Task.create(task_params)
    render json: task
  end


private

  def task_params
    params.require(:task).permit(:done, :title)
  end


end
